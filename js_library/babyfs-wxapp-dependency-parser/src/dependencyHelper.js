import j from 'jscodeshift';
import fileHelper from './fileHelper';
import directoryHelper from './directoryHelper';
import path from 'path';

/**
 * 解析指定模块的依赖
 * @param {String} moduleFileName 要解析的模块的绝对路径
 * @param {Function} onHandleDependency 处理每个依赖的回调方法
 * @param {Function} onFixDependencyPath 修正每个依赖引用路径的回调方法
 */
async function parse(moduleFileName, {
  onHandleDependency = function (originNameOrPath) {}, // originNameOrPath: 原始模块名称或者相对路径
  onFixDependencyPath = function (originNameOrPath) {} // originNameOrPath: 原始模块名称或者相对路径
} = {}) {
  let extName = path.extname(moduleFileName);
  switch (extName) {
    case '.js':
      return await parseJsFile(moduleFileName, onHandleDependency, onFixDependencyPath);
    case '.json':
      return await parseJsonFile(moduleFileName, onHandleDependency, onFixDependencyPath);
    default:
      throw new Error('解析依赖的模块文件扩展名错误');
  }
}

async function parseJsFile(filename, onHandleDependency, onFixDependencyPath) {
  let source = await fileHelper.read(filename);
  let root = j(source);
  // const body = root.get().value.program.body;

  // const createImportRegenerator = () => {
  //   return j.importDeclaration(
  //     [j.importDefaultSpecifier(
  //       j.identifier('regeneratorRuntime')
  //     )],
  //     j.literal('babyfs-regenerator')
  //   );
  // };

  const handleImportDeclaration = () => {
    let importDeclarations = root.find(j.ImportDeclaration);
    importDeclarations.map((paths) => {
      const originNameOrPath = paths.value.source.value;
      onHandleDependency(originNameOrPath);
      let literalName = onFixDependencyPath(originNameOrPath);
      paths.value.source = j.literal(literalName);
    });
  };

  const handleRequireExpression = () => {
    let requires = root.find(j.CallExpression, {
      callee: {
        name: 'require'
      }
    }).filter(requireStatement => requireStatement.value.arguments.length === 1 && requireStatement.value.arguments[0].type === 'Literal');

    requires.map((paths) => {
      const originNameOrPath = paths.value.arguments[0].value;
      onHandleDependency(originNameOrPath);
      let literalName = onFixDependencyPath(originNameOrPath);
      paths.value.arguments = [
        j.literal(literalName)
      ];
    });
  };

  handleImportDeclaration();
  handleRequireExpression();
  // body.unshift(createImportRegenerator());
  return root.toSource({quote: 'single'});
}

async function parseJsonFile(filename, onHandleDependency, onFixDependencyPath) {
  let source = await require(filename);

  if (source.usingComponents) {
    const handleComponentReference = () => {
      let keys = Object.keys(source.usingComponents);
      keys.map(key => {
          let originNameOrPath = source.usingComponents[key];
          onHandleDependency(originNameOrPath);
          source.usingComponents[key] = onFixDependencyPath(originNameOrPath);
      });
    };
    handleComponentReference();
  }
  return JSON.stringify(source, null, 2);
}

/**
 * 查找external模块
 * @param {String} moduleName 模块名称
 * @param {String} baseDirectory 查找的起始路径
 */
function findInNodeModules(moduleName, baseDirectory) {
  let tryFindPath = path.resolve(baseDirectory, 'node_modules', moduleName);
  if (directoryHelper.existSync(tryFindPath)) {
    return tryFindPath;
  }
  else {
    if (baseDirectory === '/') {
      throw new Error(`can not find module ${moduleName}`);
    }
    else {
      return findInNodeModules(moduleName, path.resolve(baseDirectory, '..'));
    }
  }
}

export default {
  parse,
  findInNodeModules
};
