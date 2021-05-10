import {Component, OnInit} from '@angular/core';
import {Category, PetCreateForm, Tag} from '../../../core/apina/apina';
import {PetService} from '../pet.service';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.css']
})
export class CreatePetComponent implements OnInit {
  categories: Category[];
  tags: Tag[];

  name: string;
  categoryId: number;
  status: string;

  selectedTags = new FormControl();

  constructor(private petService: PetService,
              private dialogRef: MatDialogRef<CreatePetComponent>) {
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.petService.getCategories()
      .subscribe(
        categories => this.categories = categories,
        error => {
          // show error message
        }
      );

    this.petService.getTags().subscribe(
      tags => this.tags = tags,
      error => {
        // show error message
      });
  }

  onCreate() {
    const form: PetCreateForm = {
      name: this.name,
      categoryId: this.categoryId,
      status: this.status,
      tagIDs: this.selectedTags.value
    };

    this.petService.createPet(form).subscribe(
      () => {
        this.dialogRef.close();
      },
      (error) => {
        // show error message
      }
    );
  }
}
