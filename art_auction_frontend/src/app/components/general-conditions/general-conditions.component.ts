import { Component } from '@angular/core';

@Component({
  selector: 'app-general-conditions',
  templateUrl: './general-conditions.component.html',
  styleUrls: ['./general-conditions.component.css']
})
export class GeneralConditionsComponent {
conditions: boolean[] = Array(12).fill(false);

  toggleCondition(index: number): void {
    // Set all conditions to false
    this.conditions.fill(false);
    
    // Set the selected condition to true
    this.conditions[index - 1] = true;
  }
}

  