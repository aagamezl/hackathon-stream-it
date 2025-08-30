export const Loader = {
  images: {},
  getImage: (name) => {
    if (!Loader.images[name]) {
      throw new Error(`Image ${name} not found`)
    }

    return Loader.images[name]
  },
  loadImage: (name, path) => {
    return new Promise((resolve, reject) => {
      const img = new Image()

      img.onload = () => {
        Loader.images[name] = img
        resolve(img)
      }

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${path}`))
      }

      // Use Vite's public directory format
      img.src = new URL(path, import.meta.url).href
    })
  }
}
