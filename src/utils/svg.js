import { SVGLoader as loader } from "three/examples/jsm/loaders/SVGLoader";
import flatten from "lodash-es/flatten";

import { svgs } from "../constants/arrays";

export const paths = svgs
  .map(
    // name => `./images/svg/${name}.svg`
    name => `./images/svg/happy1.svg`
    // `https://raw.githubusercontent.com/doong-jo/irony-mechanical-analysis/master/public/images/svg/sad1.svg`
    // name =>
    //   `https://raw.githubusercontent.com/doong-jo/irony-mechanical-analysis/master/src/resources/images/svg/${name +
    //     (Math.random() > 0.5 ? 1 : 2)}.svg`
  )
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
