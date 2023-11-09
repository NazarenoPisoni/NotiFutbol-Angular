import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PlayersComponent } from './components/players/players.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayersService } from './services/players.service';
import { TeamsComponent } from './components/teams/teams.component';
import { LeaguesByCountryComponent } from './components/leagues-by-country/leagues-by-country.component';
import { MatchesComponent } from './components/matches/matches.component';
import { NewsComponent } from './components/news/news.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './components/register/register.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaguesComponent,
    HomePageComponent,
    NavbarComponent,
    PlayersComponent,
    TeamsComponent,
    LeaguesByCountryComponent,
    MatchesComponent,
    NewsComponent,
    TeamInfoComponent,
    PlayerInfoComponent,
    MatchInfoComponent,
    SearchComponent,
    RegisterComponent,
    UserHomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PlayersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
