

Files in the sorting/base-derived folder is meant for base-derived type of charts that uses elements (named expressions) for sorting.

Sorting is done on the chart instead on the dimension. Meaning for example that current sorting will remain if dimension order is changed.


*****


Main sorting logic is found in Sorter.js.

The common usage of the methods in Sorter.js is exposed via sorter-facade.js.

Before using Sorter.js directly, see if not sorter-facade.js is enough for the use case (Box- and Distplot both use the facade).


*****


Example of how to use to implement sorting:

	¤ Implement settings, e.g. boxplot-sorting-settings.js
		- The available sorting settings

	¤ Implement settings retriever, e.g. boxplot-sorting-settings-retriever.js
		- Returns sorting settings to use based on criteria (E.g. sort by element if more than ten elements, otherwise alphabetically)

	¤ Implement elements retriever, e.g. boxplot-sorting-elements-retriever.js
		- Returns the available sorting elements / element ids

	¤ Implement sorter for the chart, e.g. boxplot-sorter.js
		- Uses the settings and elements retriever
		- Sets up boxplot specifics
		- Uses sorter-facade.js

	¤ Use the implemented sorter to apply sorting
		- Call sorter.applySorting (Often inside cube generator since that is where dimension to apply sorting to first will be available)
		- Call sorter.applySorting in the change function of autosort in the properties definition (This is needed for the correct chart sorting to be available and correctly reflected in the property panel the first time autosort is turned off)


*****


Will probably be used together with:

	¤ sort-by-element.js (Property panel component, see boxplot-propertie.js for example)	
	¤ explore-properties-sorting-definition-builder.js (Builds the sorting definition for explore properties, see boxplot-explore-properties.js for example)
