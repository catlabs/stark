import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StarkGridComponent } from "./grid.component";

describe("StarkGridComponent", () => {
	let component: StarkGridComponent;
	let fixture: ComponentFixture<StarkGridComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StarkGridComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StarkGridComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
