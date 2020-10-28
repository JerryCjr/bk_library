<template>
    <div>
        <button @click="posterEvent">测试发送</button>
        <button @click="jumpEvent">跳转</button>
    </div>
</template>

<script>
    export default {
        name: 'demo',
        methods: {
            posterEvent() {
                this.$log('poster_click_test',{id:2, source:2, text:'埋点插件测试'})
                    .then(res => {
                        console.log('res',res);
                    });
            },
            jumpEvent() {
              this.$adv('conv', { conv_type : 1 , isEmpty: true}).then(res => console.log(res));
            }
        },
        mounted () {
          this.$adv('click', null, 1000).then(res => console.log(res));
          this.$adv('conv', { conv_type : 0 , isEmpty: false }).then(res => console.log(res));
        }
    };
</script>

<style>
</style>
