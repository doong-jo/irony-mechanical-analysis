import { SVGLoader as loader } from "three/examples/jsm/loaders/SVGLoader";
import flatten from "lodash-es/flatten";

import { svgs } from "../constants/arrays";

const testSvgName = "sad1";

export const paths = svgs
  .map(name => `/${testSvgName}.svg`)
  .map(
    url =>
      new Promise(resolve =>
        new loader().load(url, shapes => {
          let indexId = 0;
          let befId = 0;

          return resolve(
            flatten(
              shapes.paths.map(group => {
                const curId = group.userData.node.id;
                if (curId !== undefined && curId !== befId) {
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
