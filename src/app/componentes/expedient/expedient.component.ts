import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor } from 'src/app/interfaces/doctor.interface';
import { AuthService } from 'src/services/authe/auth.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-expedient',
  templateUrl: './expedient.component.html',
  styleUrls: ['./expedient.component.css'],
})
export class ExpedientComponent implements OnInit {
  user: Doctor | any;

  listPatients: any[] = [
    {
      name: 'Efra',
      lastName: 'Estrada',
      age: '22',
      gender: 'male',
      emile: 'lol@gmail.com',
    },
    {
      name: 'Efra',
      lastName: 'Estrada',
      age: '22',
      gender: 'male',
      emile: 'lol@gmail.com',
    },
  ];

  form: FormGroup;

  constructor(private auth: AuthService, private fb:FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      lastName: [''],
      age: [''],
      gender: [''],
      emile: [''],
    });
  }

  ngOnInit(): void {
    this.user = this.auth.user;
  }
  addPatient() {
    console.log(this.form);

    const patient: any = {
      name: this.form.get('name')?.value,
      lastName: this.form.get('lastName')?.value,
      age: this.form.get('age')?.value,
      gender: this.form.get('gender')?.value,
      emile: this.form.get('emile')?.value,
    };
  }
}


