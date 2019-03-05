<template>
  <v-app
    dark
    id="root"
  >
    <v-content>
      <Game />
    </v-content>
  </v-app>
</template>

<script>
import Game from './components/Game'

export default {
	name: 'App',
	components: {
		Game
	},
	data() {
		return {
			//
		}
	}
}
</script>
<style>
</style>
