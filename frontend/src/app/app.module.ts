import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PagprincipalComponent } from './pagprincipal/pagprincipal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { TiendaService } from './service/tienda.service';
import { ProductoService } from './service/producto.service';
import { PedidoService } from './service/pedido.service';
import { TiendasComponent } from './tienda/tiendas/tiendas.component';
import { FooterComponent } from './footer/footer.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EditarComponent } from './editar/editar.component';
import { MapComponent } from './map/map.component';
import { LeafletModule} from '@asymmetrik/ngx-leaflet';
import { UbicacionService } from './service/ubicacion.service';
import { ProductosComponent } from './producto/productos/productos.component';
import { PedidosComponent } from './pedido/pedidos/pedidos.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    RegistroComponent,
    PagprincipalComponent,
    TiendasComponent,
    FooterComponent,
    ContactanosComponent,
    AboutUsComponent,
    PerfilComponent,
    EditarComponent,
    FooterComponent,
    MapComponent,
    ProductosComponent,
    PedidosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatExpansionModule,
    LeafletModule,
  ],
  providers: [
    AuthService,
    TiendaService,
    ProductoService,
    PedidoService,
    AuthGuard,
    UbicacionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
