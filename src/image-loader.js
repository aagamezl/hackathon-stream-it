export const ImageLoader = {
  images: {},
  getImage: (name) => {
    if (!ImageLoader.images[name]) {
      throw new Error(`Image ${name} not found`)
    }

    return ImageLoader.images[name]
  },
  loadImage: (name, path) => {
    return new Promise((resolve, reject) => {
      const img = new Image()

      img.onload = () => {
        ImageLoader.images[name] = img
        resolve(img)
      }

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${path}`))
      }

      console.log(path)

      // Use Vite's public directory format
      img.src = new URL(path, import.meta.url).href
    })
  }
}
