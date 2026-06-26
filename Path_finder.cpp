#include<iostream>
#include<vector>
#include<queue>
#include<climits>
#include<random>
#include<cstdlib>
#include<ctime>
#include<chrono>

using namespace std;

void fill_grid(vector<vector<int>>&grid,int type,int wall){
    srand(time(0));
    if(type==1){
        for(int i=0;i<grid.size();i++){
            for(int j=0;j<grid[0].size();j++){
                int n=rand()%5+1;
                grid[i][j]=n;
            }
        }
    }
    for(int i=0;i<grid.size();i++){
        for(int j=0;j<grid[0].size();j++){
            int n=rand()%100+1;
            if(n<wall) grid[i][j]=-1;
        }
    }
    grid[0][0]=rand()%5+1;
    grid[grid.size()-1][grid[0].size()-1]=rand()%5+1;
}

void print_grid(vector<vector<int>>&grid){
    for(int i=0;i<grid.size();i++){
        for(int j=0;j<grid[0].size();j++){
            cout<<grid[i][j]<<" ";
        }
        cout<<endl;
    }
}

void print_path(vector<vector<pair<int,int>>>&trace,vector<vector<int>>&grid){
    int i=grid.size()-1;
    int j=grid[0].size()-1;
    vector<vector<char>>path(i+1,vector<char>(j+1,'.'));
    int cost=0;

    cout<<"Blocked Cell - #"<<endl;
    cout<<"Path traversed - *"<<endl;

    while(i!=0 || j!=0){
        path[i][j]='*';
        pair<int,int>temp=trace[i][j];
        cost+=grid[i][j];
        i=temp.first;
        j=temp.second;
    }
    path[0][0]='*';
    for(int i=0;i<grid.size();i++){
        for(int j=0;j<grid[0].size();j++){
            if(grid[i][j]==-1){
                cout<<'#'<<" ";
                continue;
            }
            cout<<path[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<"Cost of Traversal : "<<cost<<endl;

}

void bfs(vector<vector<int>>&grid){
    int m=grid.size();
    int n=grid[0].size();

    vector<vector<int>>visited(m,vector<int>(n));
    vector<vector<pair<int,int>>>trace(m,vector<pair<int,int>>(n,{-1,-1}));
    queue<pair<int,int>>q;

    q.push({0,0});
    visited[0][0]=1;
    while(!q.empty()){
        pair<int,int>temp=q.front();
        q.pop();
        int i=temp.first;
        int j=temp.second;

        if(i==m-1 && j==n-1){
            cout<<"Destination Reached...!"<<endl;
            cout<<"BFS getting implemented..!"<<endl;
            print_path(trace,grid);
            cout<<"Check Out the Path BFS took..!"<<endl;
            return;
        }

        if(i>0 && visited[i-1][j]==0 && grid[i-1][j]!=-1){
            q.push({i-1,j});
            visited[i-1][j]=1;
            trace[i-1][j]={i,j};
        }
        if(j>0 && visited[i][j-1]==0 && grid[i][j-1]!=-1){
            q.push({i,j-1});
            visited[i][j-1]=1;
            trace[i][j-1]={i,j};
        }
        if(i<m-1 && visited[i+1][j]==0 && grid[i+1][j]!=-1){
            q.push({i+1,j});
            visited[i+1][j]=1;
            trace[i+1][j]={i,j};
        }
        if(j<n-1 && visited[i][j+1]==0 && grid[i][j+1]!=-1){
            q.push({i,j+1});
            visited[i][j+1]=1;
            trace[i][j+1]={i,j};
        }
    }
    cout<<"No Valid Path Exits..!"<<endl;
}

void dijkstra(vector<vector<int>>&grid){
    int m=grid.size();
    int n=grid[0].size();

    priority_queue<vector<int>,vector<vector<int>>,greater<vector<int>>>pq;
    vector<vector<pair<int,int>>>trace(m,vector<pair<int,int>>(n,{-1,-1}));
    vector<vector<int>>dis(m,vector<int>(n,INT_MAX));

    dis[0][0]=0;
    pq.push({0,0,0});
    while(!pq.empty()){
        vector<int>temp=pq.top();
        pq.pop();
        int w=temp[0];
        int i=temp[1];
        int j=temp[2];
        if(w>dis[i][j]) continue;
        if(i==m-1 && j==n-1){
            cout<<"Destination Reached...!"<<endl;
            cout<<"Dijkstra getting implemented..!"<<endl;
            print_path(trace,grid);
            cout<<"Check Out the Path Dijkstra took..!"<<endl;
            return;
        }

        if(i>0 && grid[i-1][j]!=-1){
            if(dis[i-1][j]>dis[i][j]+grid[i-1][j]){
                dis[i-1][j]=dis[i][j]+grid[i-1][j];
                pq.push({dis[i-1][j],i-1,j});
                trace[i-1][j]={i,j};
            }
        }
        if(j>0 && grid[i][j-1]!=-1){
            if(dis[i][j-1]>dis[i][j]+grid[i][j-1]){
                dis[i][j-1]=dis[i][j]+grid[i][j-1];
                pq.push({dis[i][j-1],i,j-1});
                trace[i][j-1]={i,j};
            }
        }
        if(i<m-1 && grid[i+1][j]!=-1){
            if(dis[i+1][j]>dis[i][j]+grid[i+1][j]){
                dis[i+1][j]=dis[i][j]+grid[i+1][j];
                pq.push({dis[i+1][j],i+1,j});
                trace[i+1][j]={i,j};
            }
        }
        if(j<n-1 && grid[i][j+1]!=-1){
            if(dis[i][j+1]>dis[i][j]+grid[i][j+1]){
                dis[i][j+1]=dis[i][j]+grid[i][j+1];
                pq.push({dis[i][j+1],i,j+1});
                trace[i][j+1]={i,j};
            }
        }
    }
    cout<<"No Valid Path Exits..!"<<endl;
}

void astar(vector<vector<int>>& grid){
    int m=grid.size();
    int n=grid[0].size();

    priority_queue<vector<int>,vector<vector<int>>,greater<vector<int>>>pq;
    vector<vector<pair<int,int>>>trace(m,vector<pair<int,int>>(n,{-1,-1}));
    vector<vector<int>>dis(m,vector<int>(n,INT_MAX));

    dis[0][0]=0;
    pq.push({m+n-2,0,0,0});

    while(!pq.empty()){
        vector<int>temp=pq.top();
        pq.pop();
        int f=temp[0];
        int g=temp[1];
        int i=temp[2];
        int j=temp[3];

        if(g>dis[i][j]) continue;
        if(i==m-1 && j==n-1){
            cout<<"Destination Reached...!"<<endl;
            cout<<"A* getting implemented..!"<<endl;
            print_path(trace,grid);
            cout<<"Check Out the Path A* took..!"<<endl;
            return;
        }

        if(i>0 && grid[i-1][j]!=-1){
            if(dis[i-1][j]>dis[i][j]+grid[i-1][j]){
                dis[i-1][j]=dis[i][j]+grid[i-1][j];
                int h=abs((m-1)-(i-1))+abs((n-1)-j);
                pq.push({h+dis[i-1][j],dis[i-1][j],i-1,j});
                trace[i-1][j]={i,j};
            }
        }
        if(j>0 && grid[i][j-1]!=-1){
            if(dis[i][j-1]>dis[i][j]+grid[i][j-1]){
                dis[i][j-1]=dis[i][j]+grid[i][j-1];
                int h=abs((m-1)-i)+abs((n-1)-(j-1));
                pq.push({h+dis[i][j-1],dis[i][j-1],i,j-1});
                trace[i][j-1]={i,j};
            }
        }
        if(i<m-1 && grid[i+1][j]!=-1){
            if(dis[i+1][j]>dis[i][j]+grid[i+1][j]){
                dis[i+1][j]=dis[i][j]+grid[i+1][j];
                int h=abs((m-1)-(i+1))+abs((n-1)-(j));
                pq.push({h+dis[i+1][j],dis[i+1][j],i+1,j});
                trace[i+1][j]={i,j};
            }
        }
        if(j<n-1 && grid[i][j+1]!=-1){
            if(dis[i][j+1]>dis[i][j]+grid[i][j+1]){
                dis[i][j+1]=dis[i][j]+grid[i][j+1];
                int h=abs((m-1)-i) + abs((n-1)-(j+1));
                pq.push({h+dis[i][j+1],dis[i][j+1],i,j+1});
                trace[i][j+1]={i,j};
            }
        }

    }
    cout<<"No Valid Path Exits..!"<<endl;
}


int main(){
    int m,n,wall,type;
    cout<<"Choose dimentions of ur Grid and wall density(from 1 to 100)...!"<<endl;
    cin>>m>>n>>wall;
    cout<<"Choose 1 for weighted Grid else choose 0 for normal Grid..!"<<endl;
    cin>>type;

    vector<vector<int>>grid(m,vector<int>(n,1));

    fill_grid(grid,type,wall);

    print_grid(grid);

    cout<<"Choose which algo to run"<<endl;
    int algo=-1;
    bool is_not_ok=true;
    while(is_not_ok){
        cout<<"For BFS choose 0"<<endl;
        cout<<"For Dijkstra choose 1"<<endl;
        cout<<"For A* choose 2"<<endl;
        cin>>algo;
        if(algo>=0 && algo<=2){
             is_not_ok=false;
             break;
        }
        cout<<"Choose Valid One"<<endl;
    }

    if(algo==0){
        auto start=chrono::high_resolution_clock::now();
        bfs(grid);
        auto end=chrono::high_resolution_clock::now();
        auto duration=chrono::duration_cast<chrono::microseconds>(end-start).count();
        cout<<"BFS Execution Time : "<<duration<<" Microseconds" <<endl;
    }
    else if (algo == 1) {
        auto start = chrono::high_resolution_clock::now();
        dijkstra(grid);
        auto end = chrono::high_resolution_clock::now();
        
        auto duration = chrono::duration_cast<chrono::microseconds>(end - start).count();
        cout << "Dijkstra Execution Time: " << duration << " microseconds." << endl;
    } 
    else if (algo == 2) {
        auto start = chrono::high_resolution_clock::now();
        astar(grid);
        auto end = chrono::high_resolution_clock::now();
        
        auto duration = chrono::duration_cast<chrono::microseconds>(end - start).count();
        cout << "A* Execution Time: " << duration << " microseconds." << endl;
    }
    
    return 0;
}