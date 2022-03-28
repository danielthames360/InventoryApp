<template>
    <div>
        <h1 class="mb-10 text-2xl font-bold">Graphics will be here</h1>

        <video
            playsinline
            class="shadow-lg aspect-video dark:shadow-golden shadow-dark-300"
            autoplay
            muted
            data-automation="VideoPlayer"
            loop
        >
            <source
                src="https://ak.picdn.net/shutterstock/videos/1054222547/preview/stock-footage-financial-business-diagram-with-charts-and-stock-numbers-showing-profits-and-losses-over-time.webm"
                type="video/webm"
            />
            <source
                src="https://ak.picdn.net/shutterstock/videos/1054222547/preview/stock-footage-financial-business-diagram-with-charts-and-stock-numbers-showing-profits-and-losses-over-time.mp4"
                type="video/mp4"
            />
        </video>

        <div class="mt-24">
            <img class="mx-auto my-0" v-show="picture != ''" :src="picture" alt />
            <br />

            <button @click="getAuthStatus" class="w-56 p-2 bg-green-500 rounded">Auth Status</button>
            <br />
            <button @click="logout" class="w-56 p-2 rounded bg-cyan-900">logout</button>
            <br />
            <button
                @click="authWithGoogle"
                class="w-56 p-2 bg-red-500 rounded hover:bg-red-400"
            >SignIn with Google</button>
            <br />
            <button
                @click="authWithFacebook"
                class="w-56 p-2 rounded bg-slate-700 hover:bg-blue-700"
            >SignIn with Facebook</button>
        </div>
    </div>
</template>

<script setup>

import { ref } from "vue";
import {
    getAuth, signOut, GoogleAuthProvider, signInWithPopup,
    FacebookAuthProvider
} from "firebase/auth";


const auth = getAuth();

const picture = ref('');

const getAuthStatus = () => {
    console.log(auth.currentUser);
    if (auth.currentUser) {
        picture.value = auth.currentUser.photoURL;
        alert('verified' + auth.currentUser.displayName)
    } else {
        picture.value = ''
        alert('verified, No user found')
    }

}
const logout = async () => {
    await signOut(auth).then((res) => {
        // Sign-out successful.
        console.log(res);
        alert('singout successfully');
    }).catch((error) => {
        // An error happened.
        alert('singout with error');
        console.log(error);
    });
}

const authWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            if (result.user) {
                picture.value = result.user.photoURL;
            }
            // ...
        }).catch((error) => {
            console.log(error);
            alert(error)
        });

    alert('executed google')

}

const authWithFacebook = async () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            console.log(result);
            if (result.user) {
                picture.value = result.user.photoURL;
            }
            // ...
        }).catch((error) => {
            console.log(error);
            alert(error)
        });

    alert('executed fb')

}


</script>
 