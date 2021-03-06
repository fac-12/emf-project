import _ from "lodash";
import { createSelector } from "reselect";

const getAssets = state => (state.assets.length === 0 ? null : state.assets);
const getTags = state =>
  Object.keys(state.tags).length === 0 ? null : state.tags;
const getSubTags = state =>
  Object.keys(state.subTags).length === 0 ? null : state.subTags;
const getFilter = state => state.filters;
const getSearchTermFromLandingpage = state => state.searchTermFromLandingPage;

const addingCategoryToAsset = createSelector(
  [getAssets, getTags, getSubTags],
  (assets, groupTag, subTags) => {
    if (subTags === null || groupTag === null) {
      return assets;
    }
    return Object.values(assets).map(
      asset =>
        asset.tags.length > 0
          ? Object.assign(asset, {
              category: Object.values(subTags)
                .map(elemSubTags =>
                  Object.assign(elemSubTags, {
                    category:
                      groupTag.length === 0
                        ? {}
                        : Object.values(groupTag).filter(
                            elemGroupTags =>
                              elemSubTags.group === elemGroupTags.id
                          )[0].name
                  })
                )
                .filter(subTagElem => asset.tags.includes(subTagElem.id))
                .reduce((acc, cur) => acc.concat(cur.category), [])
            })
          : {}
    );
  }
);

const filterBySearchTerm = createSelector(
  [getSearchTermFromLandingpage, addingCategoryToAsset],
  (searchTermFromLandingpage, assets) =>
    assets.filter(asset => {
      return Object.keys(asset).length === 0
        ? false
        : asset.name
            .toLowerCase()
            .includes(
              searchTermFromLandingpage.searchValue
                ? searchTermFromLandingpage.searchValue.toLowerCase()
                : ""
            );
    })
);

export const filterAssets = createSelector(
  [getFilter, filterBySearchTerm],
  (assetsFilters, assets) => {
    switch (assetsFilters) {
      case "BIOCYCLE":
        return _.filter(assets, asset => asset.category.includes("BIOCYCLE"));
      case "BUILT ENVIRONMENT":
        return _.filter(assets, asset =>
          asset.category.includes("BUILT ENVIRONMENT")
        );

      case "BUSINESS":
        return _.filter(assets, asset => asset.category.includes("BUSINESS"));

      case "DESIGN":
        return _.filter(assets, asset => asset.category.includes("DESIGN"));

      case "ECONOMICS":
        return _.filter(assets, asset => asset.category.includes("ECONOMICS"));

      case "EDUCATION (LEARNING)":
        return _.filter(assets, asset =>
          asset.category.includes("EDUCATION (LEARNING)")
        );

      case "ENERGY":
        return _.filter(assets, asset => asset.category.includes("ENERGY"));

      case "FINANCE & LEGAL":
        return _.filter(assets, asset =>
          asset.category.includes("FINANCE & LEGAL")
        );

      case "GOVERNMENT":
        return _.filter(assets, asset => asset.category.includes("GOVERNMENT"));

      case "MANUFACTURING & ENGINEERING":
        return _.filter(assets, asset =>
          asset.category.includes("MANUFACTURING & ENGINEERING")
        );

      case "MATERIALS":
        return _.filter(assets, asset => asset.category.includes("MATERIALS"));

      case "TECHNICAL CYCLE":
        return _.filter(assets, asset =>
          asset.category.includes("TECHNICAL CYCLE")
        );

      case "TECHNOLOGY":
        return _.filter(assets, asset => asset.category.includes("TECHNOLOGY"));

      default:
        return assets;
    }
  }
);
