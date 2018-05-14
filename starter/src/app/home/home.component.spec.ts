import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { StoreModule } from "@ngrx/store";
import {
	STARK_APP_CONFIG,
	StarkApplicationConfig,
	StarkBackend,
	StarkBackendAuthenticationTypes,
	StarkLoggingService,
	STARK_LOGGING_SERVICE,
	STARK_HTTP_SERVICE,
	STARK_SESSION_SERVICE
} from "@nationalbankbelgium/stark-core";
/**
 * Load the implementations that should be tested.
 */
import { AppState } from "../app.service";
import { HomeComponent } from "./home.component";
import { Title } from "./title";
import SpyObj = jasmine.SpyObj;

describe(`Home`, () => {
	let comp: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;
	let logger: SpyObj<StarkLoggingService>;

	const mockBackend: Partial<StarkBackend> = {
		authenticationType: StarkBackendAuthenticationTypes.PUBLIC,
		name: "logging",
		url: "dummy/url"
	};

	const mockStarkAppConfig: Partial<StarkApplicationConfig> = {
		angularDebugInfoEnabled: true,
		debugLoggingEnabled: true,
		getBackend: jasmine.createSpy("getBackendSpy").and.returnValue(mockBackend)
	};

	/**
	 * async beforeEach.
	 */
	beforeEach(async(() => {
		return (
			TestBed.configureTestingModule({
				declarations: [HomeComponent],
				schemas: [NO_ERRORS_SCHEMA],
				imports: [StoreModule.forRoot({}), HttpClientTestingModule],
				providers: [
					AppState,
					Title,
					{ provide: STARK_APP_CONFIG, useValue: mockStarkAppConfig },
					{
						provide: STARK_HTTP_SERVICE,
						useValue: jasmine.createSpyObj("StarkHttpService", ["executeSingleItemRequest", "executeCollectionRequest"])
					},
					{ provide: STARK_LOGGING_SERVICE, useValue: jasmine.createSpyObj("StarkLoggingService", ["debug", "error"]) },
					{ provide: STARK_SESSION_SERVICE, useValue: jasmine.createSpyObj("StarkSessionService", ["login"]) }
				]
			})

				/**
				 * Compile template and css.
				 */
				.compileComponents()
		);
	}));

	/**
	 * Synchronous beforeEach.
	 */
	beforeEach(() => {
		logger = TestBed.get(STARK_LOGGING_SERVICE);

		fixture = TestBed.createComponent(HomeComponent);
		comp = fixture.componentInstance;

		/**
		 * Trigger initial data binding.
		 */
		fixture.detectChanges();
		logger.debug.calls.reset();
	});

	it("should have default data", () => {
		expect(comp.localState).toEqual({ value: " " });
	});

	it("should have a title", () => {
		expect(!!comp.title).toEqual(true);
	});

	it("should log ngOnInit", () => {
		expect(logger.debug).not.toHaveBeenCalled();

		comp.ngOnInit();
		expect(logger.debug).toHaveBeenCalled();
	});
});
