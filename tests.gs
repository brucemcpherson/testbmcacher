/**
 * various example debugging aids are shown here
 * you can uncomment them to try them out
 */

const unitTest = () => {
  const unit = new Exports.Unit({
    showErrorsOnly: true
  })
  
  // use these for general tests
  const log = false

  const user = new Exports.Store({
    store: PropertiesService.getUserProperties(),
    log,
    evictAfter: 1000
  })
  const script = new Exports.Store({
    store: PropertiesService.getScriptProperties(),
    log,
    evictAfter: 1000
  })
  const cacheOptions = {

    // 20 minutes
    expiry: 20 * 60,

    // we're allowing stale marking
    stale: true,
    staleKey: 'unit-test',

    log,

    // whether or not to refresh cache entry if its accessed
    reCache: false,
    evictAfter: 1000
  }
  const userCache = new Exports.Cacher({
    ...cacheOptions,
    cachePoint: CacheService.getUserCache(),
  })
  const scriptCache = new Exports.Cacher({
    ...cacheOptions,
    cachePoint: CacheService.getScriptCache(),
  })

  // just some random fixtures
  const keys = ['a', 'b', 'c', 'd']
  const values = [100.3, { y: 1, b: true, x: false, z: 'zzzzzzz' }, 'xxxxxxx', JSON.stringify([1, 2])]
  const [k1, k2, k3, k4] = keys
  const [v1, v2, v3, v4] = values


  const skips = {
    props: false,
    preCache: true
  }
  unit.section(() => {
    // comibine props tests
    // do this 3 times, compare times

    for (let x = 0; x < 2; x++) {
      const now = new Date().getTime();
      [ user, script, userCache,scriptCache].forEach(p => {
       
        keys.forEach((k, i) => {
          if (x < 1) {
            // final timing test doesnt include a set
            unit.is(values[i], p.set(k, values[i]), {
              description:
                k + 'set'
            })
          }
          const z = new Date().getTime();
          unit.is(values[i], p.get(k), {
            description:
              k + 'get'
          })
        })
      })

    }
  }, {
    description: 'props',
    skip: skips.props
  })
  //
  // -- precache
  //
  unit.section(() => {
    const pc = new Exports.PreCache({ log: false })

    unit.is(null, pc.get(k1), {
      description: 'should be empty'
    })

    unit.not(null, pc.set(k1, v1), {
      description: 'set k1'
    })

    unit.is(v1, pc.get(k1), {
      description: 'k1 is good'
    })

    const ps = new Exports.PreCache({ log: false, maxLength: 50, evictAfter: 1000 })

    unit.not(null, ps.set(k3, v3), {
      description: 'k3 set'
    })

    unit.is(v3, ps.get(k3), {
      description: 'k3 is good'
    })

    unit.is(null, ps.set(k2, v2), {
      description: 'no room for k2'
    })

    unit.is(null, ps.get(k2), {
      description: 'k2 is null - no room'
    })

    unit.is(v4, ps.set(k4, v4), {
      description: 'v4 should have evicted k3'
    })

    unit.is(v4, ps.get(k4), {
      description: 'k4 is ok'
    })
    Utilities.sleep(2000)
    unit.is(null, ps.get(k4), {
      description: 'k4 was evicted'
    })
  }, {
    description: 'precaching',
    skip: skips.preCache
  })




  unit.report()


}


