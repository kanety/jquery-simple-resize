describe('jquery-simple-resize', () => {
  it('config', () => {
    let defaults = $.SimpleResize.getDefaults();
    expect(defaults.top).toEqual(null);

    defaults = $.SimpleResize.setDefaults({top: 'elem'});
    expect(defaults.top).toEqual('elem');
  });
});
