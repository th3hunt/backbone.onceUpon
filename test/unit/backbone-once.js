import BackboneOnce from '../../src/backbone-once';

describe('BackboneOnce', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(BackboneOnce, 'greet');
      BackboneOnce.greet();
    });

    it('should have been run once', () => {
      expect(BackboneOnce.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(BackboneOnce.greet).to.have.always.returned('hello');
    });
  });
});
