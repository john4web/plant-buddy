<template>
    <div class="w-screen h-screen bg-gray-900 top-0 left-0 fixed z-10">
        <video autoplay ref="video"></video>
        <button class="button" @click="$emit('takePicture')">Snap</button
        ><button @click="$emit('closeCamera')" class="button">X</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUnmounted, ref } from 'vue';

export default defineComponent({
    name: 'Camera',

    setup() {
        const cameraIsOpen = ref(false);
        const video = ref<HTMLMediaElement | null>(null);
        const aaa = ref<MediaStreamTrack | null>(null);
        onBeforeMount(() => {
            init();
        });

        onUnmounted(() => {
            console.log('ended');
            aaa.value?.stop();
        });

        const init = async () => {
            console.log('started');
            // if (
            //     'mediaDevices' in navigator &&
            //     'getUserMedia' in navigator.mediaDevices
            // ) {
            //     let constraints = {
            //         video: {
            //             width: {
            //                 min: 640,
            //                 ideal: 1280,
            //                 max: 1920,
            //             },
            //             height: {
            //                 min: 360,
            //                 ideal: 720,
            //                 max: 1080,
            //             },
            //         },
            //     };

            //     navigator.mediaDevices
            //         .getUserMedia(constraints)
            //         .then(async (stream) => {
            //             aaa.value = stream.getVideoTracks()[0];
            //             if (video.value) {
            //                 video.value.srcObject = stream;

            //                 video.value.play();
            //             } else {
            //                 aaa.value?.stop();
            //             }
            //         });
            // }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: { width: 400, height: 300 },
                });

                aaa.value = stream.getVideoTracks()[0];

                if (video.value) {
                    video.value.srcObject = stream;
                } else {
                    aaa.value?.stop();
                }
            } catch (error) {
                console.error(error);
            }
        };
        return { cameraIsOpen, video };
    },
});
</script>

<style scoped></style>
