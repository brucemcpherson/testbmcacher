var Exports = {  
  /**
   * Unit Class 
   * @implements {bmUnitTester.Unit} 
   */
  get Unit() {
    return bmUnitTester.Unit
  },
  /**
   * Store class
   * @implements {bmPreCache.Exports.Store} 
   */
  get Store() {
    return bmPreCache.Exports.Store
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


