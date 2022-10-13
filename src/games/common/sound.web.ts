import { Howl, Howler } from 'howler';

export function preloadFile(uri : any) {
  return new Promise((resolve, reject) => {
    var item = new Howl({
      src: [uri],
      preload: true,
      onload: () => {
        resolve(item);
      }
    });
  });
}
