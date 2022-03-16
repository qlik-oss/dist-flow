import conversion from 'qlik-object-conversion';
import pp from './histogram-properties';
import exploreProperties from './histogram-explore-properties';
import histogramExport from './histogram-export';

export default function ext(env) {
  if (!env.anything?.sense) {
    return undefined;
  }

  return {
    definition: pp(env),
    softDefinition: exploreProperties,
    support: {
      cssScaling: false,
      snapshot: true,
      export: true,
      exportData: true,
      sharing: true,
      viewData: true,
    },
    importProperties: conversion.hypercube.importProperties,
    exportProperties: conversion.hypercube.exportProperties,
    requireNumericDimension: true,
    exportTableProperties(propertyTree) {
      // the hypercube that will be used for "building" the table is under `qUndoExclude.box.qHyperCubeDef`
      const hypercubePath = 'qUndoExclude.box';
      return conversion.hypercube.exportProperties({ propertyTree, hypercubePath });
    },
    getExportRawDataOptions: histogramExport.getExportRawDataOptions,
  };
}
