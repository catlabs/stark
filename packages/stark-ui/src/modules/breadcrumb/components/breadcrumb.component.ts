import { Component, Inject, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { STARK_LOGGING_SERVICE, STARK_ROUTING_SERVICE, StarkLoggingService, StarkRoutingService } from "@nationalbankbelgium/stark-core";

const componentName: string = "stark-breadcrumb";

/**
 * @ngdoc component
 * @name stark-ui.component:starkBreadcrumb
 * @description Component to display the application's logo
 *
 * @scope
 * @restrict E
 *
 * @input {object} homeStateParams (optional) Params object to be passed to the UI router state defined as homeState.
 */
// FIXME: tslint rules temporarily disabled. Enable them once we decide the final implementation of component styles
/* tslint:disable:enforce-component-selector max-inline-declarations use-view-encapsulation use-host-property-decorator */
@Component({
	selector: componentName,
	templateUrl: "./breadcrumb.component.html",
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./breadcrumb.component.scss'],
	host: { class: "stark-breadcrumb" }
})
/* tslint:enable */
export class StarkBreadcrumbComponent implements OnInit {
	@Input() public homeStateParams?: { [property: string]: any };

	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_ROUTING_SERVICE) public routingService: StarkRoutingService
	) {
		// empty constructor
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": controller initialized");
	}

	public logoClickHandler($event: Event): void {
		// cancel the event otherwise Angular triggers a full page reload :(
		$event.preventDefault();
		this.routingService.navigateToHome(this.homeStateParams);
	}
}
