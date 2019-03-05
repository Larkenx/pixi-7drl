<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <div id="pixi_canvas" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GameDisplay from '@/assets/GameDisplay.js'
export default {
	mounted() {
		GameDisplay.mountCanvas()
		GameDisplay.render()
	},
	data: () => ({})
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Audiowide|Open+Sans');
canvas {
	border-radius: 4px;
}
</style>
