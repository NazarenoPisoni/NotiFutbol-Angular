import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PlayersComponent } from './components/players/players.component';
import { TeamsComponent } from './components/teams/teams.component';
import { MatchesComponent } from './components/matches/matches.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './components/register/register.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';

const routes: Routes = [
  {path: 'leagues', component: LeaguesComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'player/:id', component: PlayerInfoComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'matches', component: MatchesComponent},
  {path: 'match/:id', component: MatchInfoComponent},
  {path: 'search', component: SearchComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user-home/:email', component: UserHomePageComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
