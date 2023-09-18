import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxMediaSources',
})
export class MediaSourcesPipe implements PipeTransform {
  transform(srcset: string) {
    const sources: Pick<HTMLSourceElement, 'srcset' | 'media'>[] = [];

    return srcset.split(/,\s*/).reduceRight((acc, set) => {
      let [srcset, media] = set.split(' ');

      if (!srcset || !media) {
        return acc;
      }

      media = `(min-width: ${media.replace('w', 'px')})`;

      acc.push({ srcset, media });

      return acc;
    }, sources);
  }
}
