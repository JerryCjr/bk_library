<template>
    <div class="babyfs-toast" v-if="showTaost" :class="showContent ?'babyfs-fadein':'babyfs-fadeout'" :style="zIndex ? 'z-index:' + zIndex : ''">
        <div class="toast-icon-div" v-if="icon">
            <img class="toast-icon" :src="iconUrl" alt="">
        </div>
        <div class="toast-msg-div">{{msg}}</div>
    </div>
</template>
<style scoped lang="less">
    .babyfs-toast {
        position: fixed;
        left: 50%;
        top: 50%;
        background: rgba(0, 0, 0, .7);
        padding: 10px;
        border-radius: 5px;
        transform: translate(-50%, -50%);
        max-width:150px;
        z-index: 99;

        .toast-icon-div {
            width: 100%;
            padding: 0 20px;
            display: flex;
            justify-content: center;
            box-sizing: border-box;

            .toast-icon {
                width: 50px;
                height: 50px;
            }

        }

        .toast-msg-div {
            color: #fff;
            line-height: 1.5;
            font-size: 14px;
            text-align: center;
            margin: 8px 0;
        }
    }


    .babyfs-fadein {
        animation: animate_in .25s;
    }

    .babyfs-fadeout {
        animation: animate_out .25s;
        opacity: 0;
    }

    @keyframes animate_in {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes animate_out {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
</style>
