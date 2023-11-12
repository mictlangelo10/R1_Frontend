import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatStep } from '@angular/material/stepper';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;

  @ViewChild('stepper', { static: false }) stepper: MatStepper | undefined;

  bachilleratos: string[] = ['Bachillerato 1', 'Bachillerato 2', 'Bachillerato 3'];
  especialidades: string[] = ['Especialidad 1', 'Especialidad 2', 'Especialidad 3'];
  ciudades: string[] = ['Ciudad 1', 'Ciudad 2', 'Ciudad 3'];
  carreras: string[] = ['Carrera 1', 'Carrera 2', 'Carrera 3', 'Carrera 4', 'Carrera 5'];


  constructor(private fb: FormBuilder) {
    this.stepOneForm = this.fb.group({
      Nombre: ['', Validators.required],
      ApellidoP: ['', Validators.required],
      ApellidoM: ['', Validators.required],
      Telefono: ['', Validators.required],
      CorreoElectronico: ['', [Validators.required, Validators.email]],
      Bachillerato: ['', Validators.required],
      PromedioBachillerato: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      Especialidad: ['', Validators.required],
    });

    this.stepTwoForm = this.fb.group({
      Domicilio: ['', Validators.required],
      Domicilio1: ['', Validators.required],
      Domicilio2: ['', Validators.required],
      Domicilio3: ['', Validators.required],
      TelefonoCasa: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      TelefonoPadres: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      NombreMadre: ['', Validators.required],
      ApellidoPMadre: ['', Validators.required],
      ApellidoMMadre: ['', Validators.required],
      NombrePadre: ['', Validators.required],
      ApellidoPPadre: ['', Validators.required],
      ApellidoMPadre: ['', Validators.required],
    });

    this.stepThreeForm = this.fb.group({
      Carrera: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  goToNextStep(): void {
    if (this.stepper) {
      const currentForm =
        this.stepper.selected instanceof MatStep
          ? this.stepOneForm
          : this.stepper.selected instanceof MatStep
          ? this.stepTwoForm
          : this.stepThreeForm;

      if (currentForm.invalid) {
        console.log('Por favor, completa todos los campos antes de pasar al siguiente paso');
        return;
      }

      this.stepper.next();
    }
  }

  submitForm(): void {
    console.log('Formulario enviado con éxito');
  }
}
