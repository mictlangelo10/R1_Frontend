import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.stepOneForm = this.fb.group({
      // Define your Step 1 form controls here
      stepOneCtrl: ['', Validators.required],
    });

    this.stepTwoForm = this.fb.group({
      // Define your Step 2 form controls here
      stepTwoCtrl: ['', Validators.required],
    });

    this.stepThreeForm = this.fb.group({
      // Define your Step 3 form controls here
      stepThreeCtrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
}
