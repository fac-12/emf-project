import React from "react";

export default ({ assets }) =>
  Object.values(assets).map(asset => (
    <li key={asset.id}>
      <img src="" />
      <span>{asset.tag}</span>
      <div>
        <span>{asset.name}</span>
        <a>
          <img src="" />
        </a>
      </div>
    </li>
  ));
