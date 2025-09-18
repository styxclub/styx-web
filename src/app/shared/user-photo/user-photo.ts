import { HttpClient } from '@angular/common/http';
import {
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { environment } from '@env/environment';
import { PhotoSize } from '@interfaces/interfaces';

@Component({
  selector: 'app-user-photo',
  imports: [],
  templateUrl: './user-photo.html',
  styleUrl: './user-photo.scss',
})
export default class UserPhoto implements OnInit {
  private http: HttpClient = inject(HttpClient);
  id: InputSignal<number> = input.required<number>();
  size: InputSignal<PhotoSize> = input<PhotoSize>('sm');

  imageSrc: WritableSignal<string | null> = signal<string | null>(null);

  ngOnInit(): void {
    this.loadImage();
  }

  loadImage(): void {
    const endpoint = `${environment.apiUrl}/auth/user-photo/${this.id()}`;

    this.http.post(endpoint, {}, { responseType: 'blob' }).subscribe({
      next: (blob: Blob): void => {
        const reader = new FileReader();
        reader.onload = (): void => {
          this.imageSrc.set(reader.result as string);
        };
        reader.readAsDataURL(blob);
      },
      error: (err): void => {
        console.error('Error al cargar la imagen:', err);
      },
    });
  }
}
