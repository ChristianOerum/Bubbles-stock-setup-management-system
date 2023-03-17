<template>
<LoginScreen v-if="password !== VUE_APP_ACCESS_PIN" v-model:modelValue="password">
</LoginScreen>

<div v-else>
  <Dashpage v-if="dash_index == 0">
  </Dashpage>

  <Dashpage2 v-else-if="dash_index == 1">
  </Dashpage2>


  <div class="bg-[#43474D] left-5 bottom-5 rounded-md w-max h-14 absolute flex flex-row justify-center items-center">
    <button class="text-white flex text-opacity-40 w-max pl-4 pr-4" @click="clearLocalStorage()">Log ud</button>
    <button class="text-white flex text-opacity-40 w-max pl-4 pr-4" @click="switchDash('last')">Forrige side</button>
    <button class="text-white flex text-opacity-40 w-max pl-4 pr-4" @click="switchDash('next')">Næste side</button>
  </div>

  <div class="h-14 w-[365px] bg-[#43474D] absolute right-5 bottom-5 rounded-md flex flex-col justify-center items-center grid grid-cols-7 grid-rows-2 p-2">
    <h1 class="text-white/[0.4] row-start-1 col-span-6 w-[270px] truncate">{{ current_song_name + " " + current_song_artist }}</h1>

    <button v-if="musicOn" class="row-end-1 col-start-7 absolute right-5 top-2 text-white" @click="playSong()"><fa icon="pause"/></button>
    <button v-else class="row-end-1 col-start-7 absolute right-5 top-2 text-white" @click="playSong()"><fa icon="play"/></button>

    <button class="row-end-1 col-start-7 absolute right-[40px] top-2 text-white/[0.5]" @click="songEnded()"><fa icon="forward"/></button>
    <button class="row-end-1 col-start-7 absolute right-[65px] top-2 text-white/[0.5]" @click="backward()"><fa icon="backward"/></button>

    <h1 class="text-white/[0.4] text-sm row-start-2 col-start-1 col-end-3">{{ timeConvert(current_song_nowduration) }} / {{  timeConvert(current_song_duration) }}</h1>
    <div class="h-[10px] w-[245px] bg-white/[0.4] rounded-full row-start-2 col-start-3 col-end-7" @click="playhead($event)">
      <div :style="{ width: ((245/current_song_duration)*current_song_nowduration) + 'px' }" class="h-[10px] bg-[#0097ff] right-0 rounded-full">
        
        <audio v-on:timeupdate=updateBar() id="audio-test" v-on:ended=songEnded() preload="auto">
        <source src="https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Just%20the%20Two%20of%20Us%20(feat.%20Bill%20Withers).mp3?raw=true" type="audio/mp3">
        </audio>

        <audio v-on:ended=alarmEnded() id="alarm-audio-player">
        <source src="https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Alarm%20Siren%20Sound%20Fx.mp3?raw=true" type="audio/mp3">
        </audio>

      </div>
    </div>
  </div>

  <h1 class="absolute bottom-3 font-medium text-white/[0.1] left-1/2 transform -translate-x-1/2">Copyright © 2023 Bubbles ApS</h1>


  <div v-if="popupOpen" class="transition ease-in-out absolute w-full h-screen bg-[#612020]/[0.87] top-0 flex flex-col justify-center items-center">
      <H1 class="text-[#EC2020] font-semibold text-9xl animate-pulse">ADVARSEL!</H1>
      <P class="text-[#EC2020] font-semibold text-8xl animate-pulse">Salgs afdelingen brænder!</P>
    </div>
  </div>

</template>

<script>
//import af tailwind CSS
import './assets/tailwind.css'
//import af dash_page komponent
import Dashpage from "./page/Dash_page.vue";
import Dashpage2 from "./page/Dash_page2.vue";
import LoginScreen from "./page/Login_screen.vue";
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    Dashpage,
    Dashpage2,
    LoginScreen
  },
  data() {
    return {
      MRR: 1,
      musicOn: false,
      musicOnLable: "musicOff",
      audioStarted: false,
      popupOpen: false,
      current_song_name: "Just the Two of Us",
      current_song_artist: "Bill Withers",
      current_song_index: 0,
      dash_index: 0,
      password: localStorage.getItem('Password'),
      VUE_APP_ACCESS_PIN: process.env.VUE_APP_ACCESS_PIN,
      current_song_duration: "20",
      current_song_nowduration: "0",
      audio_options: [
      {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Just%20the%20Two%20of%20Us%20(feat.%20Bill%20Withers).mp3?raw=true", name:"Just the Two of Us", artist:"Bill Withers"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/4_00%20A.M..mp3?raw=true", name:"4:00A.M.", artist:"Taeko Ohnuki"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Aloe%20Blacc-%20The%20Man.mp3?raw=true", name:"The Man", artist:"Aloe Blacc"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/BENEE%20-%20Evil%20Spider%20(Lyric%20Video).mp3?raw=true", name:"Evil Spider", artist:"BENEE "},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Bastille%20-%20Pompeii%20(Lyrics).mp3?raw=true", name:"Pompeii", artist:"Bastille "},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Childish%20Gambino%20-%20Redbone%20(Official%20Audio).mp3?raw=true", name:"Redbone", artist:"Childish Gambino"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Dua%20Lipa%20-%20We're%20Good%20(Official%20Audio).mp3?raw=true", name:"We're Good", artist:"Dua lipa"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Everything%20She%20Wants.mp3?raw=true", name:"Everything She Wants", artist:"Wham!"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Ghost%20Town%20DJ's%20-%20My%20Boo.mp3?raw=true", name:"My Boo", artist:"Ghost town DJs"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Glass%20Animals%20-%20Heat%20Waves.mp3?raw=true", name:"Heat Waves", artist:"Glass Animals"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Gravity%20by%20John%20Mayer.mp3?raw=true", name:"Gravity", artist:"John Mayer"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/JAY-Z%20-%20Empire%20State%20Of%20Mind%20(Lyrics)%20ft.%20Alicia%20Keys.mp3?raw=true", name:"Empire state of mind", artist:"JAY-Z, Alicia Keys"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/John%20Mayer%20-%20New%20Light%20(Official%20Audio).mp3?raw=true", name:"New Light", artist:"John Mayer"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Journey%20-%20Don't%20Stop%20Believin'%20(Official%20Audio).mp3?raw=true", name:"Dont Stop Believin'", artist:"Journey"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Justin%20Bieber%20-%20Peaches%20ft.%20Daniel%20Caesar,%20Giveon.mp3?raw=true", name:"Peaches", artist:"Justin Beiber, Daniel Caesar"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Kali%20Uchis%20%20telepat%C3%ADa%20%5BOfficial%20Audio%5D.mp3?raw=true", name:"Telepatía", artist:"Kali Uchis"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Lil%20Nas%20X%20-%20STAR%20WALKIN'%20(Lyrics).mp3?raw=true", name:"STAR WALKIN'", artist:"Lil Nas X"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Mariya%20Takeuchi%20-%20Plastic%20Love%20(Romaji%20Lyric%20Video).vhs.mp3?raw=true", name:"Plastic Love", artist:"Mariya Takeuchi"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Maroon%205%20ft.%20Megan%20Thee%20Stallion%20-%20Beautiful%20Mistakes%20(Lyrics).mp3?raw=true", name:"Beautiful Mistakes", artist:"Maroon 5, Megan Thee Stallion"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Neonlys.mp3?raw=true", name:"Neonlys", artist:"Ukendt Kunstner"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Physical%20(Remastered%202021).mp3?raw=true", name:"Physical", artist:"Olivia Newton-John"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Post%20Malone%20-%20I%20Like%20You%20(A%20Happier%20Song)%20w.%20Doja%20Cat%20%5BOfficial%20Music%20Video%5D.mp3?raw=true", name:"I Like You", artist:"Post Malone, Doja Cat"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Private%20-%20My%20Secret%20Lover%20(High%20Quality).mp3?raw=true", name:"My Secret Lover", artist:"Private"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Stolen%20Dance.mp3?raw=true", name:"Stolen Dance", artist:"Milky Chance"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/The%20Jacksons%20-%20Blame%20It%20on%20the%20Boogie%20(Official%20Audio).mp3?raw=true", name:"Blame It on the Boogie", artist:"The Jacksons"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Toploader%20-%20Dancing%20in%20the%20Moonlight%20(Official%20Video).mp3?raw=true", name:"Dancing in the Moonlight", artist:"Toploader"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Toto%20-%20Africa%20(Official%20HD%20Video).mp3?raw=true", name:"Africa", artist:"Toto"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Treasure%20-%20Bruno%20Mars%20(Lyrics).mp3?raw=true", name:"Treasure", artist:"Bruno Mars"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/Wham!%20-%20Wake%20Me%20Up%20Before%20You%20Go-Go%20%5BLyrics%5D.mp3?raw=true", name:"Wake Me Up Before You Go-Go", artist:"Wham!"},
        {src: "https://github.com/ChristianOerum/Bubbles-Dashboard/blob/main/music/imugi%20%EC%9D%B4%EB%AC%B4%EA%B8%B0%20-%20Somebody%20Else%20(Official%20Video).mp3?raw=true", name:"Somebody Else", artist:"Imugi 이무기"}
      ]
    }
  },

  methods: {
    playSong(){
      let audio = document.getElementById("audio-test");

      if (audio.paused){
        audio.play()
        audio.volume = 0.05
        this.musicOnLable = "musicOn"
        this.musicOn = true
      }
      else {
        audio.pause()
        this.musicOnLable = "musicOff"
        this.musicOn = false
      }
    },
    switchDash(button_type){
      if (button_type == 'next') {
         if (this.dash_index == 1) {
          this.dash_index = 0
         }
         else {
          this.dash_index +=1
         }

      } else if (button_type == 'last') {
        if (this.dash_index == 0) {
          this.dash_index = 1
         }
         else {
          this.dash_index -=1
         }
      }


    },

    timeConvert(e){
      const
          m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
          s = Math.floor(e % 60).toString().padStart(2,'0');

          if (isNaN(m) || isNaN(s)) {
            return "0:00"
          }

          else {
            return m + ':' + s;
          }
    },

    clearLocalStorage(){
      localStorage.clear();
      location.reload();
    },

    updateBar(){
      this.current_song_duration = document.getElementById("audio-test").duration
      this.current_song_nowduration = document.getElementById("audio-test").currentTime
    },

    playhead(event){
      let slected_duration = (this.current_song_duration/245)*event.offsetX

      let test_audio = document.getElementById("audio-test");
      test_audio.currentTime = slected_duration
    },

    backward(){
      this.current_song_artist = ""
      this.current_song_name = ""

      console.log(this.current_song_index)
      
      if (this.current_song_index != 0 ) {
        this.current_song_index -= 1
      }
      else {
        this.current_song_index = this.audio_options.length -1
      }
      let selected_track = this.audio_options[this.current_song_index]

      let audio = document.getElementById('audio-test')

      audio.pause();
      audio.currentTime = 0

      audio.src = selected_track.src 
      
      setTimeout(() => {
        audio.play()
        audio.volume = 0.05
        this.current_song_name = selected_track.name + ", "
        this.current_song_artist = selected_track.artist
      }, 3000);
    },

    songEnded(){

      this.current_song_artist = ""
      this.current_song_name = ""

      if (this.current_song_index+1 != this.audio_options.length ) {
        this.current_song_index += 1
      }
      else {
        this.current_song_index = 0
      }
      let selected_track = this.audio_options[this.current_song_index]

      let audio = document.getElementById('audio-test')

      audio.pause();
      audio.currentTime = 0

      audio.src = selected_track.src 
      
      setTimeout(() => {
        audio.play()
        audio.volume = 0.05
        this.current_song_name = selected_track.name + ", "
        this.current_song_artist = selected_track.artist
      }, 3000);
    },

    alarmEnded(){
      this.popupOpen = false
    }
  },
  mounted() {
    window.addEventListener("keypress", function(e) {
      if (String.fromCharCode(e.keyCode) == "s") {
        console.log("Run Sales alarm!")
        
        let audio = document.getElementById("alarm-audio-player");
        audio.play()
        audio.volume = 0.6
        this.popupOpen = true

      }
      else {
        //logger alle characterer som ikke er "s"
      console.log(String.fromCharCode(e.keyCode));
    }

    }.bind(this));
  },
  
});
</script>
