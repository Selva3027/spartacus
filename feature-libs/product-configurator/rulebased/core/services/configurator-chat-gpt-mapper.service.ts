import { Injectable } from '@angular/core';
import { Configurator } from '../model/configurator.model';

/**
 * Configurator chat-gpt sample implementation
 */
@Injectable({
  providedIn: 'root',
})
export class ConfiguratorChatGtpMapperService {
  constructor() {}

  serializeConfiguration(config: Configurator.Configuration): string {
    // provide attributes and subobject as filters
    return JSON.stringify(config,['flatGroups', 'attributes','name','description', 'id', 'values', 'value', 'valuePrice']);
  }
}
