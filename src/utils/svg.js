import { SVGLoader as loader } from "three/examples/jsm/loaders/SVGLoader";
import flatten from "lodash-es/flatten";

import { svgs } from "../constants/arrays";

const testSvgName = "sadness_2_n";

export const paths = svgs
  .map(name => `/${testSvgName}.svg`)
  .map(
    url =>
      new Promise(resolve =>
        new loader().load(url, shapes => {
          let indexId = 0;
          let befId = "";

          return resolve(
            flatten(
              shapes.paths.map(group => {
                const curId = group.userData.node.id;
                if (curId !== "" && curId !== befId) {
                  indexId++;
                  befId = curId;
                }

                return group.toShapes(true).map(shape => ({
                  shape,
                  color: group.color,
                  index: indexId
                }));
              })
            )
          );
        })
      )
  );
