var Exports = {  
  /**
   * Unit Class 
   * @implements {bmUnitTester.Unit} 
   */
  get Unit() {
    return bmUnitTester.Unit
  },

  /**
   * Store Class
   * @implements {bmPreCache.Store} 
   */
  get Store () {
    return bmPreCache.Exports.Store
  },

  /**
   * Store instance with validation
   * @param {...*} args
   * @return {Store}
   */
  newStore: (...args)  => {
    return bmPreCache.Exports.newStore (...args)
  },

  /**
   * Cacher class
   * @implements {bmPreCache.Exports.Cacher} 
   */
  get Cacher() {
    return bmPreCache.Exports.Cacher
  },

  /**
   * PreCache class
   * @implements {bmPreCache.Exports.PreCache} 
   */
  get PreCache() {
    return bmPreCache.Exports.PreCache
  },

}


