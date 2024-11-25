import { a, addnum } from '@/utils'
const init = () => { 
  console.log('init sdk')
}
const track = () => { 
  console.log('track')
}
console.log(addnum(1, 2))
console.log(a)
console.log('main.ts')
export default {
  init,
  track
}