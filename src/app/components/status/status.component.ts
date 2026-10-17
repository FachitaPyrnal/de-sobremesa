import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-status",
  template: `<div class="status" [attr.role]="error() ? 'alert' : 'status'">
    @if (loading()) {
      <span class="spinner" aria-hidden="true"></span>
    }
    <h2>{{ title() }}</h2>
    <p>{{ message() }}</p>
    @if (error()) {
      <button type="button" class="button" (click)="retry.emit()">
        Volver a intentar ↻
      </button>
    }
  </div>`,
})
export class StatusComponent {
  readonly title = input("");
  readonly message = input("");
  readonly loading = input(false);
  readonly error = input(false);
  readonly retry = output<void>();
}
