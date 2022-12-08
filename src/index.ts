// import { Joi } from '@docusaurus/utils-validation';

import type { LoadContext, Plugin, OptionValidationContext } from '@docusaurus/types';
import type { PluginOptions, Options } from './options';

export default function pluginGoogleAdsense(
  context: LoadContext,
  options: PluginOptions,
): Plugin {
  const { dataAdClient } = options;

  const isProd = process.env.NODE_ENV === 'production';

  return {
    name: 'docusaurus2-plugin-google-adsense',

    injectHtmlTags() {
      // if (!isProd) {
      //   return {};
      // }

      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${dataAdClient}`,
              crossorigin: 'anonymous',
            },
          },
          {
            tagName: 'script',
            innerHTML: `
            window.addEventListener("load", () => {
              (adsbygoogle = window.adsbygoogle || []).push({});
            });

            function displayGoogleAds() {
              const placeholders = document.getElementsByClassName('adsbygoogle-ins-placeholder');
              console.log('placeholders count:', placeholders.length);
              for (let i = 0; i < placeholders.length; i++) {
                const ins = document.createElement('ins');
                ins.setAttribute('class', 'adsbygoogle');
                ins.setAttribute('style', 'display:block; text-align:center;"');
                ins.setAttribute('data-ad-layout', 'in-article');
                ins.setAttribute('data-ad-format', 'fluid');
                ins.setAttribute('data-ad-client', 'ca-pub-${dataAdClient}');
                ins.setAttribute('data-ad-slot', '4993301259');
                placeholders[i].parentNode.insertBefore(ins, placeholders[i].nextSibling);
              }
            }
            `,
          },
        ],
      };
    },
  };
}

// const pluginOptionsSchema = Joi.object<PluginOptions>({
//   dataAdClient: Joi.string().required()
// });

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  // return validate(pluginOptionsSchema, options);

  // Not use `Joi` to avoid mixing Joi versions
  if (!options.dataAdClient) {
    throw new Error('Missing dataAdClient option');
  }

  return {
    dataAdClient: options.dataAdClient!
  };
}

export type { PluginOptions, Options };