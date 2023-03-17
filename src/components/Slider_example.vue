<template>
    <div class="h-[54px] w-[200px] p-1 rounded-full relative overflow-hidden" :style="`background-color: ${'rgba(255, 255, 255, '+(1 - ((leftOffset-26) / 300))+')'}`">

        <h1 v-if="hide == false" class="text-poppins font-bold text-[12px] absolute top-[18px] right-[18px] text-[#FFAD50]" :style="`opacity: ${1 - ((leftOffset-26) / 65)}`">Swipe to shutdown</h1>

        <div v-if="hide == false" class="rounded-full h-[46px] w-[50px] relative translate-x-[-50%]"
            :style="`left: ${leftOffset + 'px'}`" id="slider" @mousedown="dragMouseDown" @touchstart="dragTouch">

            <div class="bg-[#F15E5E] rounded-full h-full w-full flex flex-col justify-center items-center absolute"
                :style="`opacity: ${leftOffset / 200}`">

                <svgCreater class="h-[70%] w-[70%] absolute" name="powerIcon2"></svgCreater>

            </div>

            <div class="bg-[#FFEDD8] rounded-full h-full w-full flex flex-col justify-center items-center absolute"
                :style="`opacity: ${1 - (leftOffset / 150)}`">

                <svgCreater class="h-[70%] w-[70%] absolute" name="powerIcon"></svgCreater>

            </div>

        </div>


        <div v-else
            class="bg-[#F15E5E] rounded-full h-[46px] w-[50px] absolute right-[4px] flex flex-col justify-center items-center">
            <svgCreater class="h-[70%] w-[70%] absolute" name="powerIcon2"></svgCreater>
        </div>

    </div>
</template>

<script>
import svgCreater from "@/components/svgCreater.vue";

export default {
    data() {
        return {
            clientX: undefined,
            movementX: 0,
            leftOffset: 26,
            hide: false
        }
    },
    props: {},
    components: {
        svgCreater
    },
    methods: {
        shutdownSequence() {
            console.log("shutting down device")
        },
        dragMouseDown(event) {
            this.clientX = event.clientX
            document.onmousemove = this.sliderDrag
            document.onmouseup = this.cancelDrag
        },
        sliderDrag() {
            let newLeftOffset = (event.clientX - ((window.innerWidth - 200) / 2))

            if (newLeftOffset >= 165) {
                this.hide = true
                this.shutdownSequence()
            }

            this.leftOffset = newLeftOffset
        },
        cancelDrag() {
            document.onmouseup = null
            document.onmousemove = null
            this.clientX = undefined
            this.movementX = 0

            if (this.leftOffset > 25.5) {
                for (let i = this.leftOffset; i > 26; i--) {
                    setTimeout(() => this.leftOffset = this.leftOffset - 1, 0.7 * ((i * i) / 100));
                }
            }
            else {
                for (let i = this.leftOffset; i < 26; i++) {
                    setTimeout(() => this.leftOffset = this.leftOffset + 1, 0.3 * ((i * i * i) / 100));
                }
            }
        },



        dragTouch() {
            this.clientX = event.clientX
            document.ontouchmove = this.touchDrag
            document.ontouchend = this.cancelTouchlDrag
        },
        touchDrag() {
            let newLeftOffset = (event.touches[0].pageX - ((window.innerWidth - 200) / 2))

            if (newLeftOffset >= 165) {
                this.hide = true
                this.shutdownSequence()
            }

            this.leftOffset = newLeftOffset


        },
        cancelTouchlDrag() {
            document.onmouseup = null
            document.onmousemove = null
            this.clientX = undefined
            this.movementX = 0

            if (this.leftOffset > 25.5) {
                for (let i = this.leftOffset; i > 26; i--) {
                    setTimeout(() => this.leftOffset = this.leftOffset - 1, 0.7 * ((i * i) / 100));
                }
            }
            else {
                for (let i = this.leftOffset; i < 26; i++) {
                    setTimeout(() => this.leftOffset = this.leftOffset + 1, 0.3 * ((i * i * i) / 100));
                }
            }


        },


    }
}
</script>