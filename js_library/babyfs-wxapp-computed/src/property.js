
const privateMemberSet = Symbol('privateMemberSet');

class Property {
  constructor(name) {
    this[privateMemberSet] = {
      name,
      dependencyList: [],
      referenceList: []
    };
  }

  get name() {
    return this[privateMemberSet].name;
  }

  get referenceList() {
    return this[privateMemberSet].referenceList;
  }

  addDependency(otherProperty) {
    // 循环依赖校验
    if (otherProperty[privateMemberSet].dependencyList.findIndex(elem => elem.name === this.name) > -1) {
      throw new Error(`${otherProperty.name}与${this.name}产生了循环依赖`);
    }
    let idx = this[privateMemberSet].dependencyList.findIndex(elem => elem.name === otherProperty.name);
    if (idx > -1) {
      return 1;
    }
    this[privateMemberSet].dependencyList.push(otherProperty);
    otherProperty[privateMemberSet].referenceList.push(this);
    return 0;
  }
}

export default Property;
