const fetchHook = (fn) => {
  try {
    fn().then((result) => {
      return this.next(result)
    })
  } catch {
    return this.throw(new Error('request fail'))
  }
}

export default fetchHook;