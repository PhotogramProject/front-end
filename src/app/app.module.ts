import { NgModule } from '@angular/core';

/* import all modules, services and components from package export files */
import {ProvidersExport} from './export/providers-services/export-providers';
import {ComponentsExport} from './export/components/export-components';
import {ExportComponentsObj} from './export/components/export-components-obj';
import {ModulesExport} from './export/modules/export-modules';
import { JourneyCommentsSidebarComponent } from './components/journey-comments-sidebar/journey-comments-sidebar.component';

@NgModule({
  declarations: [...ComponentsExport, JourneyCommentsSidebarComponent],
  imports: [...ModulesExport],
  providers: [...ProvidersExport],
  bootstrap: [ExportComponentsObj.App]
})
export class AppModule { }
