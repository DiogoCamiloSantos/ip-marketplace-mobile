module.exports = {
  /**
   * mangle: uglify 2's mangle option
   */
  mangle: false,

  /**
   * compress: uglify 2's compress option
   */
  compress: {
    toplevel: true,
    pure_getters: true
  }
};