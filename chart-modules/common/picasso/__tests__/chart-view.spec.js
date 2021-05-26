import '../../../../../test/unit/node-setup';
import chai from 'chai';
import sinon from 'sinon';
import $ from 'jquery';
import qvangular from '../../../qvangular/qvangular';
import ChartView from '../chart-view';
import InteractionStates from '../../utils/interaction-states';
import DefaultSelectionToolbar from '../../extension/default-selection-toolbar';

const expect = chai.expect;

describe('chart-view', () => {
  let $container;
  let scope;
  let options;
  let backendApi;
  let selectionsApi;
  let myChart;
  let layout;
  let $element;
  let $width;
  let $height;

  beforeEach(() => {
    $container = $('<div style="width: 600px; height: 400px;"><div class="picasso-chart"></div></div>');

    scope = qvangular.$rootScope.$new(true);
    qvangular.getService('$compile')($container)(scope);

    backendApi = {
      getData: sinon.stub().returns({ then() {} }),
      model: {
        layout: {},
      },
    };

    const MyChart = ChartView.extend({
      createChartSettings: sinon.stub().returns({ components: [] }),
      getDisclaimerAttributes: sinon.stub().returns({}),
    });

    options = {
      myOptionTrue: true,
      myOptionFalse: false,
    };
    selectionsApi = {
      clear() {},
      watchActivated() {},
      watchDeactivated() {},
    };
    myChart = new MyChart(scope, $container, options, backendApi, selectionsApi);

    layout = {
      qHyperCube: {
        qDimensionInfo: [],
        qMeasureInfo: [],
      },
    };

    $width = 100;
    $height = 200;
    $element = {
      width() {
        return $width;
      },
      height() {
        return $height;
      },
    };
  });

  afterEach(() => {
    scope.$destroy();
  });

  it('initializes a chart', () => {
    // expect(chartElement.innerHTML).to.equal("");
    expect(myChart.createChartSettings).to.not.have.been.called;
  });

  it('paints a chart', () => {
    myChart.layout = layout;
    myChart.paint($element);
    expect(myChart.createChartSettings).to.have.been.calledWith(myChart.layout);
  });

  it('resizes a chart', () => {
    myChart.layout = layout;
    myChart.resize($element, layout);
    expect(myChart.createChartSettings).to.have.been.calledWith(myChart.layout);
  });

  it('calls updateData function', () => {
    const layout = {
      data: {},
      permissions: {},
    };
    myChart.updateData(layout);
    expect(myChart.layout).to.not.equal(layout);
    expect(myChart.layout.permissions).to.equal(layout.permissions);
    expect(myChart.layout).to.deep.equal(layout);
  });

  it('sets freeResize', () => {
    expect(myChart.options.freeResize).to.be.undefined; // TODO I would expect this to be false
    myChart.setFreeResize(true);
    expect(myChart.options.freeResize).to.equal(true);
  });

  it('toggle on/off', () => {
    expect(myChart.isOn()).to.equal(false);
    myChart.on();
    expect(myChart.isOn()).to.equal(true);
    myChart.off();
    expect(myChart.isOn()).to.equal(false);
  });

  it('sets interaction state', () => {
    expect(myChart.isOn()).to.equal(false);
    myChart.setInteractionState(InteractionStates.ANALYSIS);
    expect(myChart.isOn()).to.equal(true);
    myChart.setInteractionState(InteractionStates.EDIT);
    expect(myChart.isOn()).to.equal(false);
  });

  it('hasOption function', () => {
    expect(myChart.hasOption('myOptionTrue')).to.equal(true);
    expect(myChart.hasOption('myOptionFalse')).to.equal(false); // TODO I would expect this to return true - should rename hasOption function
    expect(myChart.hasOption('myOptionNotThere')).to.equal(false);
  });

  it('createChartSettings function', () => {
    const CustomChart = ChartView.extend({});
    const customChart = new CustomChart(scope, $container, options, backendApi, selectionsApi);
    expect(customChart.createChartSettings).to.throw(Error);
  });

  it('adds properties to a snapshot', () => {
    const snapshotLayout = {
      snapshotData: {},
    };
    myChart.setSnapshotData(snapshotLayout);
    expect(snapshotLayout).to.deep.equal({
      snapshotData: {
        content: {
          chartData: {},
          size: {
            w: 600,
            h: 400,
          },
        },
      },
    });
  });

  it('gets the correct data', () => {
    const rect = {
      top: 0,
      left: 0,
      width: 1000,
      height: 1000,
    };
    const hypercube = {
      qSize: {
        qcx: 1000,
      },
    };
    myChart.getData(backendApi, hypercube, rect);
    // A hypercube should have at most 10000 values
    expect(backendApi.getData).to.have.been.calledWith(
      [
        {
          qHeight: 10,
          qLeft: 0,
          qTop: 0,
          qWidth: 1000,
        },
      ],
      null,
      hypercube
    );
  });

  it('destroys a chart', () => {
    myChart.layout = layout;
    myChart.paint(null);
    myChart.destroy();
    // expect(chartElement.innerHTML).to.equal("");
  });

  it('getSelectionToolbar() is called with expected params', () => {
    myChart.options.selections = true;
    myChart._selectionHandler = {};

    sinon
      .stub(DefaultSelectionToolbar.prototype, 'constructor')
      .callsFake(function (_backendApi, _selectionsApi, _showMenu, _showLock, _addBeforeDefaultButtons, _menuButtons) {
        // Imitate constructor behaviour
        const _defaultButtons = [{}, {}];
        this.buttons = _addBeforeDefaultButtons.concat(_defaultButtons);

        // Test
        expect(_backendApi).to.deep.equal(backendApi);
        expect(_selectionsApi).to.deep.equal(selectionsApi);
        expect(_showMenu).to.equal(false);
        expect(_showLock).to.equal(false);
        expect(_addBeforeDefaultButtons).to.have.length(2);
        expect(_menuButtons).to.have.length(0);

        expect(_addBeforeDefaultButtons[0].name).to.equal('Tooltip.ToggleOnLassoSelection');
        expect(_addBeforeDefaultButtons[0].tid).to.equal('selection-toolbar.toggleLasso');

        expect(_addBeforeDefaultButtons[1].name).to.equal('Tooltip.clearSelection');
        expect(_addBeforeDefaultButtons[1].tid).to.equal('selection-toolbar.clear');
      });

    const toolbarInstance = myChart.getSelectionToolbar();
    expect(toolbarInstance).to.be.instanceOf(DefaultSelectionToolbar);

    DefaultSelectionToolbar.prototype.constructor.restore();
  });

  describe('> getLayoutMode', () => {
    it(' should calculate correctly for case 1', () => {
      myChart.options.freeResize = true;
      myChart.options.layoutMode = 15;
      const layout = {};
      expect(myChart.getLayoutMode(layout)).to.equal(15);
    });

    it(' should calculate correctly for case 2', () => {
      myChart.options.freeResize = false;
      myChart.options.layoutMode = 15;
      const layout = {};
      expect(myChart.getLayoutMode(layout)).to.equal(15);
    });

    it(' should calculate correctly for case 3', () => {
      myChart.options.freeResize = false;
      myChart.options.layoutMode = 15;
      const layout = { snapshotData: { content: { size: { w: 1000, h: 1000 } } } };
      expect(myChart.getLayoutMode(layout)).to.equal(31);
    });

    it(' should calculate correctly for case 4', () => {
      myChart.options.freeResize = false;
      myChart.options.layoutMode = 15;
      const layout = { snapshotData: { content: { size: { w: 300, h: 300 } } } };
      expect(myChart.getLayoutMode(layout)).to.equal(7);
    });

    it(' should calculate correctly for case 5', () => {
      myChart.options.freeResize = true;
      myChart.options.layoutMode = 15;
      const layout = { snapshotData: { content: { size: { w: 1000, h: 1000 } } } };
      expect(myChart.getLayoutMode(layout)).to.equal(15);
    });
  });
});
