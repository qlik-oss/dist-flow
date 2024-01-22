# Picasso chart-base

The foundation of using Picasso in the Sense Client.

## Contents and responsibility

The chart base has the main responsibility to provide base functionality for charts in Qlik Sense using Picasso. This includes:

- Creating Picasso components and charts.
- Feeding charts with data (render + update).
- Interactions such as tooltips, scrolling and selections.
- Reusable utility functions
- Property panel components
- Soft property panel components

## Architecture

### How it fits into the whole picture

```
    Boxplot
Distribution plot
   Histogram
Waterfall chart
      |
      |
(Object framework)
      |
      |
  Chart base
      |
      |
   Picasso
```

### Folder structure

Suggested folder structure:

```
- picasso
	- tooltip
		- tooltip-handler.js
		- tooltip-handler.spec.js
		- ...
	- selections
		- selection-handler.js
		- selection-handler.spec.js
		- ...
	- scrolling
		- scrolling-handler.js
		- scrolling-handler.spec.js
		- ...
	- property-panel-components
		- my-component
			- my-component.js
			- my-component.ng.html
			- my-component.spec.js
		- ...
	- chart-builder.js
	- chart-view.js
	- dual-axis-chart-view.js
	- dual-axis-scrollable-chart-view.js
	- picasso-setup.js
```

This structure enables grouping on a component level and should make it easy to find and add files.

## API

API:s should be general and may not contain any references to visualizations. Prefer a functional approach where possible to avoid keeping too much state in components (state keeping should ideally be left to the user of the components, the chart-view). A good flow to think of is that the chart-view should feed components with data, simply rendering and updating them. Binding events and such should be done in the chart-view (or in the charts themselves).

## Testing

Prefer unit tests over component tests. If you want to unit test a file `tooltip.js`, put your tests in the file `tooltip.spec.js` in the same folder.

We have an aim of 80% unit test coverage. You can see the current coverage at: https://rd-pawds-sense.rdlund.qliktech.com/extensions/PASA444/PASA444.html. To generate a coverage report locally, run the command `pnpm run test:coverage` in the root folder of this project (the report will be generated in the `results/coverage` folder, go there and open the `index.html` file in the subdirectory in your browser).

## Additional linting

Lint rules are a bit stricter within this folder in an effort trying to prevent error-prone coding styles.

## What should be in the chart base and what should not?

The chart base is currently limited to Picasso only charts, hence it's location in the `picasso` folder.

To know if a component should be in the chart base, it has to fulfill the following requirements:

- The component is reusable for more than one chart (current or future)
- The component is testable
- The component will make us save time (in MS22)

## Future work

We want to continue improving and building on the chart framework in the future to make more charts and objects using it. When we are satisfied with the API:s we will consider making them available to extensions.
