import { SVGLoader as loader } from "three/examples/jsm/loaders/SVGLoader";
import flatten from "lodash-es/flatten";

import { svgs } from "../constants/arrays";

export const paths = svgs
  .map(
    name =>
      `https://raw.githubusercontent.com/doong-jo/irony-mechanical-analysis/master/src/resources/images/svg/sad1.svg`
    // name =>
    //   `https://raw.githubusercontent.com/doong-jo/irony-mechanical-analysis/master/src/resources/images/svg/${name +
    //     (Math.random() > 0.5 ? 1 : 2)}.svg`
  )
  .map(
    url =>
      new Promise(resolve =>
        new loader().load(url, shapes =>
          resolve(
            flatten(
              shapes.paths.map((group, index) =>
                group
                  .toShapes(true)
                  .map(shape => ({ shape, color: group.color, index }))
              )
            )
          )
        )
      )
  );
