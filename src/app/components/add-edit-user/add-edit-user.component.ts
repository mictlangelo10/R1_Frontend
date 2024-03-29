import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatStep } from '@angular/material/stepper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;
  selectedImageUrl: SafeUrl | undefined;
  selectedPdfUrlBachillerato: SafeUrl | undefined;
  selectedPdfNameBachillerato: string | undefined;

  selectedPdfUrlDomicilio: SafeUrl | undefined;
  selectedPdfNameDomicilio: string | undefined;

  @ViewChild('stepper', { static: false }) stepper: MatStepper | undefined;

  bachilleratos: string[] = ['Bachillerato 1', 'Bachillerato 2', 'Bachillerato 3'];
  especialidades: string[] = ['Especialidad 1', 'Especialidad 2', 'Especialidad 3'];
  ciudades: string[] = ['Ciudad 1', 'Ciudad 2', 'Ciudad 3'];
  carreras: string[] = ['Carrera 1', 'Carrera 2', 'Carrera 3', 'Carrera 4', 'Carrera 5'];
  universidades: string[] = ['Universidad 1', 'Universidad 2', 'Universidad 3'];

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {
    this.stepOneForm = this.fb.group({
      Nombre: ['', Validators.required],
      ApellidoP: ['', Validators.required],
      ApellidoM: ['', Validators.required],
      Telefono: ['', [Validators.required, Validators.pattern(/^\d{0,10}$/)]],
      CorreoElectronico: ['', [Validators.required, Validators.email]],
      Bachillerato: ['', Validators.required],
      PromedioBachillerato: ['', [Validators.required, Validators.min(6), Validators.max(10)]],
      Especialidad: ['', Validators.required],
    });

    this.stepTwoForm = this.fb.group({
      Domicilio: ['', Validators.required],
      Domicilio1: ['', Validators.required],
      Domicilio2: ['', Validators.required],
      Domicilio3: ['', Validators.required],
      TelefonoCasa: ['', [Validators.required, Validators.pattern(/^\d{0,10}$/)]],
      TelefonoPadres: ['', [Validators.required, Validators.pattern(/^\d{0,10}$/)]],
      NombreMadre: ['', Validators.required],
      ApellidoPMadre: ['', Validators.required],
      ApellidoMMadre: ['', Validators.required],
      NombrePadre: ['', Validators.required],
      ApellidoPPadre: ['', Validators.required],
      ApellidoMPadre: ['', Validators.required],
    });

    this.stepThreeForm = this.fb.group({
      Carrera: ['', Validators.required],
      Universidad: ['', Validators.required],
      ArchivoPdf: [''],
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

  onPhoneNumberInput(event: Event, controlName: string): void {
    const inputElement = event.target as HTMLInputElement;
    let currentValue = inputElement.value;

    currentValue = currentValue.replace(/[^0-9]/g, '');

    if (currentValue.length > 10) {
      currentValue = currentValue.slice(0, 10);
    }

    let currentForm: FormGroup | undefined;

    if (this.stepper && this.stepper.selectedIndex === 0) {
      currentForm = this.stepOneForm;
    } else if (this.stepper && this.stepper.selectedIndex === 1) {
      currentForm = this.stepTwoForm;
    } else if (this.stepper && this.stepper.selectedIndex === 2) {
      currentForm = this.stepThreeForm;
    }

    currentForm?.get(controlName)?.setValue(currentValue);
  }

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      this.selectedImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  onPdfSelected(event: any, fileType: string): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      if (fileType === 'bachillerato') {
        this.selectedPdfNameBachillerato = file.name;
        this.selectedPdfUrlBachillerato = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      } else if (fileType === 'domicilio') {
        this.selectedPdfNameDomicilio = file.name;
        this.selectedPdfUrlDomicilio = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      }

      this.cdr.detectChanges(); // Forzar la actualización manual de Angular
    }
  }
}
