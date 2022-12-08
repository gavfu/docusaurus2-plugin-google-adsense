import { Joi } from '@docusaurus/utils-validation';

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
      if (!isProd) {
        return {};
      }

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
        ],
      };
    },
  };
}

const pluginOptionsSchema = Joi.object<PluginOptions>({
  dataAdClient: Joi.string().required()
});

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  return validate(pluginOptionsSchema, options);
}

export type {PluginOptions, Options};