import { NearestFilter, TextureLoader, RepeatWrapping } from 'three'

import {
	grassImg
} from './images'

const grassTexture = new TextureLoader().load(grassImg)


grassTexture.magFilter = NearestFilter;

grassTexture.wrapS = RepeatWrapping
grassTexture.wrapT = RepeatWrapping

export {
	grassTexture
}