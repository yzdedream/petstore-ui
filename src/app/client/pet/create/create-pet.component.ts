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
  status = 'available';

  selectedTags = new FormControl();

  isError = false;
  errorMessage = '';

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
          this.showError('error getting categories');
        }
      );

    this.petService.getTags().subscribe(
      tags => this.tags = tags,
      error => {
        this.showError('error getting tags');
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
        this.showError('error in creating pet');
      }
    );
  }

  private showError(msg: string) {
    this.isError = true;
    this.errorMessage = msg;
    setTimeout(() => {
      this.isError = false;
      this.errorMessage = '';
    }, 2000);
  }
}
