import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatStep } from '@angular/material/stepper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; // Importa DomSanitizer

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;
  selectedImageUrl: SafeUrl | undefined; // Cambia el tipo de string a SafeUrl
  selectedPdfUrl: SafeUrl | undefined; // Nueva variable para la vista previa de PDF
  selectedPdfName: string | undefined; // Nuevo campo para almacenar el nombre del archivo PDF


  @ViewChild('stepper', { static: false }) stepper: MatStepper | undefined;

  bachilleratos: string[] = ['Bachillerato 1', 'Bachillerato 2', 'Bachillerato 3'];
  especialidades: string[] = ['Especialidad 1', 'Especialidad 2', 'Especialidad 3'];
  ciudades: string[] = ['Ciudad 1', 'Ciudad 2', 'Ciudad 3'];
  carreras: string[] = ['Carrera 1', 'Carrera 2', 'Carrera 3', 'Carrera 4', 'Carrera 5'];
  universidades: string[] = ['Universidad 1', 'Universidad 2', 'Universidad 3'];

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
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

    // Limpiar el valor de no ser numérico
    currentValue = currentValue.replace(/[^0-9]/g, '');

    // Ajustar la longitud si es necesario
    if (currentValue.length > 10) {
      // Ajustar el valor truncándolo a los primeros 10 caracteres
      currentValue = currentValue.slice(0, 10);
    }

    // Determinar el formulario actual
    let currentForm: FormGroup | undefined;

    if (this.stepper && this.stepper.selectedIndex === 0) {
      currentForm = this.stepOneForm;
    } else if (this.stepper && this.stepper.selectedIndex === 1) {
      currentForm = this.stepTwoForm;
    } else if (this.stepper && this.stepper.selectedIndex === 2) {
      currentForm = this.stepThreeForm;
    }

    // Actualizar el valor en el formulario
    currentForm?.get(controlName)?.setValue(currentValue);
  }

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      // Crear una URL segura para la vista previa de la imagen
      this.selectedImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));

      // Puedes realizar acciones adicionales aquí, como cargar la imagen en un servicio, etc.
    }
  }
  onPdfSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      this.selectedPdfName = file.name; // Almacena el nombre del archivo
      // Crear una URL segura para la vista previa del archivo PDF
      this.selectedPdfUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));

      // Puedes realizar acciones adicionales aquí, como cargar el PDF en un servicio, etc.
    }
  }
}
